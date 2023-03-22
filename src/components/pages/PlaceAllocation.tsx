import { Divider, message, notification, PageHeader, Skeleton } from 'antd'
import { MutationUpdaterFn } from 'apollo-boost'
import { Moment } from 'moment'
import * as React from 'react'
import { MutationFunction } from 'react-apollo'
import { RouteComponentProps } from 'react-router'
import {
  Allocation,
  GetPlaceComponent,
  ListAllocationsComponent,
  Place,
  SetAllocationComponent
} from '../../generated/graphql'
import { route } from '../../util/routes'
import { Content } from '../atoms/Content'
import { Header } from '../molecules/Header'
import { Sider } from '../molecules/Sider'
import { AllocationsEditor } from '../organisms/AllocationsEditor'
import { UsersEditor } from '../organisms/UsersEditor'
import { MainLayout } from '../templates/MainLayout'
import moment = require('moment')

interface IParams {
  id: string
}

export const PlaceAllocation: React.FunctionComponent<RouteComponentProps<
  IParams
>> = ({
  match: {
    params: { id }
  },
  history
}) => {
  const [date, setDate] = React.useState<Moment>(moment())
  const it = date.clone()
  const variables = {
    place: id,
    from: it.startOf('month').format('YYYY-MM-DD'),
    to: it.endOf('month').format('YYYY-MM-DD')
  }

  const handleBack = () => {
    history.push(route('places'))
    return
  }

  const handleError = () => {
    notification.error({
      message: 'Oops! :(',
      description: 'Este estabelecimento não existe mais.'
    })
    handleBack()
  }

  const handleSave = (mutation: MutationFunction) => async (
    date: string,
    people: string[],
    updateHandler?: (variables: any) => MutationUpdaterFn,
    optimisticResponse?: Allocation
  ) => {
    console.log(optimisticResponse)
    try {
      await mutation({
        variables: { input: { place: id, date, people } },
        refetchQueries: ['listAllocations'],
        update: updateHandler?.(variables),
        optimisticResponse
      })
      message.success('Alocação salva com sucesso!')
    } catch (err) {
      message.error('Oops! Ocorreu um erro ao salvar esta alocação.')
      throw err
    }
  }

  return (
    <MainLayout header={<Header />} sider={<Sider path={['places', 'list']} />}>
      <Content>
        <GetPlaceComponent onError={handleError} variables={{ id }}>
          {({ loading, data }) =>
            loading ? (
              <Skeleton />
            ) : !data!.getPlace! ? (
              <>{handleError()}</>
            ) : (
              <>
                <PageHeader
                  title={data!.getPlace!.name}
                  subTitle={'Mês de ' + date.format('MMMM')}
                  onBack={handleBack}
                  style={{ padding: 0, marginBottom: 24 }} // add +7 for button offset
                  // extra={[<Button type="primary">Alocar segurança</Button>]}
                />
                <SetAllocationComponent>
                  {setAllocation => (
                    <ListAllocationsComponent variables={variables}>
                      {({
                        loading: allocationsLoading,
                        data: allocationsData
                      }) =>
                        allocationsLoading && !allocationsData ? (
                          <Skeleton />
                        ) : (
                          <AllocationsEditor
                            headcount={data!.getPlace!.headcount}
                            allocations={
                              allocationsData!.listAllocations as Allocation[]
                            }
                            loading={allocationsLoading}
                            date={date}
                            onChange={setDate}
                            onSave={handleSave(setAllocation)}
                          />
                        )
                      }
                    </ListAllocationsComponent>
                  )}
                </SetAllocationComponent>
                <Divider />
                <UsersEditor place={data!.getPlace as Place} />
              </>
            )
          }
        </GetPlaceComponent>
      </Content>
    </MainLayout>
  )
}

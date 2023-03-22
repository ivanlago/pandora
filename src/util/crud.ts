import { message, Modal } from 'antd'
import { MutationFunction } from 'react-apollo'
import { ModalProps } from './modal'
import { toInput } from './transform'

type CrudHook<T> = {
  create: (mutation: MutationFunction) => void
  update: (mutation: MutationFunction, entity: T) => void
  remove: (mutation: MutationFunction, entity: T) => void
}

export interface CrudModal<T> extends ModalProps {
  entity?: T
}

type Entity = {
  [key: string]: any
  __typename?: any
  id: string
  name: string
}

interface IAttributes<T> {
  entityName: string
  entityArticle: string
  editModal: (args: Partial<CrudModal<T>>) => void
  refetch: string
}

export const generateCRUD = <T extends Entity>({
  entityName,
  entityArticle: x,
  editModal,
  refetch
}: IAttributes<T>): CrudHook<T> => {
  const create = (mutation: MutationFunction) =>
    editModal({
      onOk: async (input: Partial<T>) => {
        try {
          await mutation({
            variables: { input: toInput(input) },
            refetchQueries: [refetch]
          })
          message.success(`${entityName} criad${x} com sucesso!`)
        } catch (err) {
          message.error(
            `Oops! Há algo errado com os dados d${x} ${entityName.toLowerCase()}.`
          )
          throw err
        }
      }
    })

  const update = (mutation: MutationFunction, entity: T) =>
    editModal({
      entity,
      onOk: async (input: Partial<T>) => {
        try {
          await mutation({
            variables: { input: toInput(input) },
            refetchQueries: [refetch]
          })
          message.success(`${entityName} editad${x} com sucesso!`)
        } catch (err) {
          message.error(
            `Oops! Há algo errado com os dados d${x} ${entityName.toLowerCase()}.`
          )
          throw err
        }
      }
    })

  const remove = (mutation: MutationFunction, entity: T) =>
    Modal.confirm({
      title: 'Esta ação é irreversível!',
      content: `Tem certeza que deseja excluir ${x} ${entityName.toLowerCase()} "${
        entity.name
      }"?`,
      okText: 'Sim, desejo excluir',
      cancelText: 'Não, retornar à lista',
      onOk: async () => {
        try {
          await mutation({
            variables: { input: { id: entity.id } },
            refetchQueries: [refetch]
          })
          message.success(
            `${x.toUpperCase()} ${entityName.toLowerCase()} foi excluído com sucesso!`
          )
        } catch (err) {
          message.error(
            `Oops! Não foi possível excluir ${x} ${entityName.toLowerCase()}.`
          )
        }
      }
    })

  return { create, update, remove }
}

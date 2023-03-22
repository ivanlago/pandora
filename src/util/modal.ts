import * as React from 'react'
const { useState } = React

export interface ModalProps {
  onOk: ModalAction
  onCancel: () => void
}

type Partial<T> = { [P in keyof T]?: T[P] }
type ModalAction = (...args: any[]) => Promise<void>
type ModalCaller<T> = (props: Partial<T>) => void
type ModalPlaceholder<T> = React.ComponentType<Partial<T>>
type ModalHook<T> = [ModalPlaceholder<T>, ModalCaller<T>]

export const useModal = <T extends ModalProps>(
  Component: React.ComponentType<T>
): ModalHook<T> => {
  const [props, setProps] = useState<Partial<T>>({})
  const [open, setOpen] = useState(false)

  const handleShow: ModalCaller<T> = props => {
    setProps(props)
    setOpen(true)
  }

  const handleCancel = () => {
    setOpen(false)
    setProps({})
  }

  const handleOk: ModalAction = async (...args) => {
    const handler = props.onOk
    if (handler) {
      await handler.apply(null, args)
    }
    handleCancel()
  }

  const placeholder: React.ComponentType<any> = defaultProps =>
    open
      ? React.createElement(Component, {
          ...defaultProps,
          ...props,
          onCancel: handleCancel,
          onOk: handleOk
        })
      : null

  return [placeholder, handleShow]
}

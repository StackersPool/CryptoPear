import { ModalControls } from "@/hooks/use-modal"
import { Dialog, Transition } from "@headlessui/react"
import clsx from "clsx"
import { Fragment, ReactNode } from "react"

type Props = ModalControls & {
  title?: string
  sm?: boolean
  children: ReactNode
}

export function Modal({ title, sm, isOpen, onClose, backdropClose = true, children }: Props) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10 text-sm" onClose={backdropClose ? onClose : () => {}}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={clsx(
                  "w-full transform overflow-hidden rounded-md bg-white px-3 pt-3 pb-4 align-middle shadow-xl transition-all md:px-5 md:pt-4 md:pb-5",
                  sm ? "max-w-sm" : "max-w-lg"
                )}
              >
                {title && (
                  <Dialog.Title className="mb-4 text-center text-sm font-medium leading-none text-gray-900 md:text-base">
                    {title}
                  </Dialog.Title>
                )}
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

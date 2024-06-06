import {
  RootLayout,
  Sidebar,
  Content,
  DraggableTopBar,
  ActionButtonsRow,
  NotePreviewList,
  MarkdownEditor
} from '@/components'

/* eslint-disable prettier/prettier */

const App = () => {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <>
      <DraggableTopBar />
      <RootLayout>
        <Sidebar className="p-2">
          <ActionButtonsRow className="flex justify-between mt-1" />
          <NotePreviewList className="mt-3 space-y-1" />
        </Sidebar>
        <Content className="border-l bg-zinc-900/50 border-l-white/20">
          <MarkdownEditor />
        </Content>
      </RootLayout>
    </>
  )
}

export default App

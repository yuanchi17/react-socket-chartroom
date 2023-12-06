export function ConnectionState({ isConnected }) {
  return (
    <p>
      Connection State: {isConnected || 'false'}
      <br />
      請下指令 yarn start-web，待服務啟動後再重整頁面
    </p>
  )
}

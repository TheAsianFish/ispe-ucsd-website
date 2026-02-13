import { getCurrentBoard } from "@/content/board"

export default async function BoardPage() {
  const board = await getCurrentBoard()

  if (!board) {
    return <div className="p-10">No current board found.</div>
  }

  return (
    <pre className="p-10 text-sm">
      {JSON.stringify(board, null, 2)}
    </pre>
  )
}

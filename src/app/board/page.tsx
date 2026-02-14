import { getCurrentBoard } from "@/content/board"
import { Container } from "@/components/ui/Container"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { BoardMemberTile } from "@/components/cards/BoardMemberTile"
import { urlFor } from "@/sanity/lib/image"

export default async function BoardPage() {
  const board = await getCurrentBoard()

  if (!board) {
    return (
      <div className="py-10 sm:py-12 lg:py-16">
        <Container>
          <p className="text-sm text-slate-600">No board data found.</p>
        </Container>
      </div>
    )
  }

  const members = board.seats.map((seat) => ({
    name: seat.person.name,
    role: seat.role,
    major: seat.person.major ?? "",
    classYear: seat.person.classYear ?? "",
    photo: seat.person.image
      ? urlFor(seat.person.image).width(400).height(300).url()
      : undefined,
    linkedin: seat.person.linkedin,
  }))

  return (
    <div className="py-10 sm:py-12 lg:py-16">
      <Container className="space-y-8">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">
            Leadership
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Meet the Board
          </h1>
          <p className="max-w-2xl text-sm text-slate-600 sm:text-base">
            The ISPE UCSD Student Chapter board helps plan programs, events, and
            partnerships that support students each year.
          </p>
        </header>

        <section
          aria-labelledby="board-members-heading"
          className="space-y-5 sm:space-y-6"
        >
          <SectionHeading
            eyebrow={board.title}
            title="Board members"
            description={
              <p>
                Board data is managed in Sanity. Officers can update names,
                roles, and majors to keep each term&apos;s board history
                accurate.
              </p>
            }
          />

          {members.length === 0 ? (
            <p className="text-sm text-slate-600">
              There are no board members listed for this term yet.
            </p>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2">
              {members.map((member) => (
                <BoardMemberTile
                  key={member.name + member.role}
                  member={member}
                />
              ))}
            </div>
          )}
        </section>
      </Container>
    </div>
  )
}

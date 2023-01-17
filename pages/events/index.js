import Link from "next/link";

export default function EventsPage({ data }) {
  return (
    <>
      <h2>Event page</h2>
      <div className="event-container">
        {data.map((event) => (
          <div key={event.id}>
            <Link href={`/events/${event.id}`}>
              <img
                src={event.image}
                width={200}
                height={200}
                alt={event.title}
              />
              <h2>{event.title}</h2>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export async function getStaticProps() {
  const { events_categories } = await import("/data/data.json");
  // console.log(events_categories);
  return {
    props: {
      data: events_categories,
    },
  };
}

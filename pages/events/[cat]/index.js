import Link from "next/link";

export default function EventsCatPage({ data, pageName }) {
  return (
    <>
      <h2>Event in {pageName}</h2>
      <div className="event-container">
        {data.map((event) => (
          <div key={event.id}>
            <Link href={`/events/${event.city}/${event.id}`}>
              <img src={event.image} alt={event.title} />
              <h2>{event.title}</h2>
              <p>{event.description}</p>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const { events_categories } = await import("/data/data.json");
  const allPaths = events_categories.map((ev) => {
    return {
      params: {
        cat: ev.id.toString(),
      },
    };
  });

  return {
    paths: allPaths,
    fallback: false,
  };
}
export async function getStaticProps(context) {
  // console.log(context);
  const id = context?.params.cat;
  const { allEvents } = await import("/data/data.json");

  const data = allEvents.filter((ev) => ev.city === id);

  return { props: { data, pageName: id } };
}

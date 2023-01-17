export default function EventPage({ data }) {
  return (
    <>
      <div className="single-event">
        <img src={data.image} width={300} height={200} alt={data.title}></img>
        <h1>{data.title}</h1>
        <p>{data.description}</p>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const data = await import("/data/data.json");
  const allEvents = data.allEvents;

  const allPaths = allEvents.map((path) => {
    return {
      params: {
        cat: path.city,
        id: path.id,
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
  const id = context.params.id;
  const { allEvents } = await import("/data/data.json");
  const eventData = allEvents.find((ev) => id === ev.id);

  return {
    props: { data: eventData },
  };
}

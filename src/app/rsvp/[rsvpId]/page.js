export default function RsvpDetailPage({ params }) {
  const { rsvpId } = params;

  return (
    <div>
      <h1>RSVP Details</h1>
      <p>Details for RSVP ID: {rsvpId}</p>
    </div>
  );
}

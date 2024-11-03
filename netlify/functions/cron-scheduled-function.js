export default async (req) => {
  try {
    // Replace 'YOUR_ENDPOINT_URL' with the URL of your Next.js endpoint
    const endpoint = "/api/matchScheduler?id=2002";
    const { next_run } = await req.json();
    // Make a GET request to the endpoint
    const response = await fetch(endpoint);

    // Log the response
    console.log("Response from /xyz endpoint:", response.data, next_run);
  } catch (error) {
    console.error("Error requesting /xyz endpoint:", error);
  }
};

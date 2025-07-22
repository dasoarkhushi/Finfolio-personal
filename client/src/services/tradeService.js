export const fetchTradesByEmail = async (email) => {
  const res = await fetch(`/api/trades/${email}`);
  if (!res.ok) throw new Error("Failed to fetch trades");
  return res.json();
};

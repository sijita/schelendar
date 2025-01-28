export const getRandomColor = () => {
  const hue = Math.floor(Math.random() * 360);
  const pastelColor = `hsl(${hue}, 70%, 85%)`;
  const textColor = `hsl(${hue}, 80%, 30%)`;

  return { bgColor: pastelColor, textColor };
};

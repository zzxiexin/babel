export default function DiceRoll() {
  const [num, setNum] = useState(getRandomNumber());

  const getRandomNumber = () => {
    return Math.ceil(Math.random() * 6);
  };

  return (
    <div>
      Your dice roll:
      {num}
    </div>
  );
}

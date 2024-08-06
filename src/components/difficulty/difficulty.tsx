import cn from "clsx";

export type DifficultyProps = {
  difficulty: "easy" | "medium" | "hard";
};

export default function Difficulty({ difficulty }: DifficultyProps) {
  return (
    <span
      className={cn("rounded-xl px-3 py-0.5 text-sm font-bold capitalize", {
        "bg-green-400/20 text-green-500": difficulty === "easy",
        "bg-yellow-400/20 text-yellow-500": difficulty === "medium",
        "bg-red-400/20 text-red-500": difficulty === "hard",
      })}
    >
      {difficulty}
    </span>
  );
}

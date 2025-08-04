import { StarIcon } from "lucide-react";

type StarsProps = {
  score: number; // 0 - 1
};

export default function Stars({ score }: StarsProps) {
  const stars = [];
  const fullStars = Math.floor(score * 5);
  const hasHalfStar = (score * 5) % 1 >= 0.5;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(
        <StarIcon
          key={i}
          className="size-4 fill-primary-highlighter text-primary-highlighter"
        />
      );
    } else if (i === fullStars && hasHalfStar) {
      stars.push(
        <div key={i} className="relative size-4">
          <StarIcon className="size-4 text-muted-foreground" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <StarIcon className="size-4 fill-primary-highlighter text-primary-highlighter" />
          </div>
        </div>
      );
    } else {
      stars.push(<StarIcon key={i} className="size-4 text-muted-foreground" />);
    }
  }

  return stars;
}

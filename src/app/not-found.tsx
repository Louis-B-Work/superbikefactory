import { ArrowRightIcon } from "@/components/icons";
import { UtilityHero } from "@/components/UtilityHero";
import { ButtonLink, Highlight, TextLink } from "@/components/ui";

export default function NotFound() {
  return (
    <UtilityHero
      title={<>Looks like you&apos;ve taken a <Highlight>wrong turn</Highlight></>}
      intro="The page you're looking for doesn't exist."
      center
    >
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-5">
        <ButtonLink href="/">
          Back to home <ArrowRightIcon className="h-4 w-4" />
        </ButtonLink>
        <TextLink href="/bike-finance">
          Explore bike finance <ArrowRightIcon className="h-4 w-4" />
        </TextLink>
      </div>
    </UtilityHero>
  );
}

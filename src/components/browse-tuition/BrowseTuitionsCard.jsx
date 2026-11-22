import Image from "next/image";
import Link from "next/link";

import { ArrowRight, CalendarDays, MapPin, UserRound } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { formatClassLevel } from "@/lib/format";

const TuitionCard = ({ tuition }) => {
  return (
    <Card className="group overflow-hidden rounded-2xl border border-[#1E3A34]/10 bg-white p-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Image */}
      <div className="relative m-3 mb-0 h-52 overflow-hidden rounded-xl bg-[#FAF6EF]">
        <Image
          src={tuition.bannerImage}
          alt={tuition.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Location */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-[#12352C]/90 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
          <MapPin className="h-3.5 w-3.5 text-[#C89B5A]" />
          {tuition.location || "Location not specified"}
        </div>
      </div>

      {/* Content */}
      <CardContent className="space-y-4 px-5 pt-4 pb-3">
        {/* Subject & Class */}
        <div className="flex items-center justify-between gap-2">
          <Badge className="border-0 bg-[#E8F1EC] text-[#1E3A34] hover:bg-[#E8F1EC]">
            {tuition.subject}
          </Badge>

          <span className="text-xs font-medium text-muted-foreground">
            {formatClassLevel(tuition.classLevel)}
          </span>
        </div>

        {/* Title */}
        <h2 className="line-clamp-2 min-h-12 text-base font-bold leading-6 text-[#1E3A34] transition-colors group-hover:text-[#C89B5A]">
          {tuition.title}
        </h2>

        {/* Tutor & Schedule */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <UserRound className="h-4 w-4 text-[#C89B5A]" />
            <span className="max-w-28 truncate">
              {tuition.tutorName || "Tutor"}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4 text-[#C89B5A]" />
            <span>{tuition.daysPerWeek}d/week</span>
          </div>
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex items-center justify-between gap-3 border-t border-[#1E3A34]/10 px-5 py-4">
        <div>
          <p className="text-xs text-muted-foreground">Monthly Fee</p>

          <p className="text-xl font-bold text-[#1E3A34]">
            ৳{Number(tuition.monthlyFee).toLocaleString("en-BD")}
            <span className="ml-1 text-xs font-normal text-muted-foreground">
              /mo
            </span>
          </p>
        </div>

        <Button
          render={<Link href={`/browse-tuitions/${tuition._id}`} />}
          nativeButton={false}
          className="gap-2 rounded-xl bg-[#176B5B] text-white hover:bg-[#125447]"
        >
          View Details
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TuitionCard;

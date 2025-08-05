"use client";

import { ArrowRight, Crown, Users } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function CommunityProList() {
  const handleDiscordRedirect = () => {
    window.open("https://discord.gg/rFGsbjBZ", "_blank");
  };

  return (
    <div className="flex items-center justify-center pt-12">
      <Card className="w-full max-w-md bg-gradient-to-br from-purple-600 to-blue-600 text-white border-0 shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
              <Crown className="w-8 h-8" />
            </div>
          </div>
          <div className="space-y-2">
            <Badge
              variant="secondary"
              className="bg-white/20 text-white border-white/30"
            >
              Premium Access
            </Badge>
            <CardTitle className="text-2xl font-bold">Community Pro</CardTitle>
            <CardDescription className="text-purple-100">
              Join our exclusive Discord community for premium members
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Users className="w-4 h-4 text-purple-200" />
              <span>Exclusive member discussions</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Crown className="w-4 h-4 text-purple-200" />
              <span>Priority support & resources</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <ArrowRight className="w-4 h-4 text-purple-200" />
              <span>Direct access to experts</span>
            </div>
          </div>

          <Button
            onClick={handleDiscordRedirect}
            className="w-full bg-white text-purple-600 hover:bg-purple-50 font-semibold py-3 transition-all duration-200 transform hover:scale-105"
            size="lg"
          >
            Join Discord Community
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>

          <p className="text-xs text-center text-purple-200">
            Premium membership required • Instant access
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

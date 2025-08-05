"use client";

import {
  Clock,
  HeadphonesIcon,
  Mail,
  MessageCircle,
  Phone,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function SupportPage() {
  const whatsappNumber = "+525578050576"; // Replace with your actual WhatsApp Business number
  const whatsappMessage = "Hello! I need support with turtle trade...";

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${whatsappNumber.replace(
      /[^0-9]/g,
      ""
    )}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="text-black py-12">
        <div className="container mx-auto px-4 text-center">
          <HeadphonesIcon className="mx-auto h-16 w-16 mb-4" />
          <h1 className="text-4xl font-bold mb-2">Support Center</h1>
          <p className="text-xl opacity-90">We're here to help you</p>
        </div>
      </div>

      <div className="container mx-auto py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {/* WhatsApp Business - Primary Contact */}
          <Card className="border-2 border-green-200 bg-green-50/50">
            <CardHeader className="text-center">
              <div className="mx-auto h-12 w-12 bg-green-500 rounded-full flex items-center justify-center mb-4">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-green-700">
                WhatsApp Business
              </CardTitle>
              <CardDescription>
                Get instant support via WhatsApp
              </CardDescription>
              <Badge
                variant="secondary"
                className="w-fit mx-auto bg-green-100 text-green-700"
              >
                Recommended
              </Badge>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                Chat with our support team directly on WhatsApp for quick
                assistance
              </p>
              <Button
                onClick={handleWhatsAppClick}
                className="w-full bg-green-500 hover:bg-green-600 text-white"
                size="lg"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Start WhatsApp Chat
              </Button>
              <div className="flex items-center justify-center text-sm text-muted-foreground">
                <Clock className="mr-1 h-3 w-3" />
                Mon-Fri 9AM-6PM EST
              </div>
            </CardContent>
          </Card>

          {/* Phone Support */}
          {/* <Card>
            <CardHeader className="text-center">
              <div className="mx-auto h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center mb-4">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Phone Support</CardTitle>
              <CardDescription>Speak directly with our team</CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                Call us for immediate assistance with urgent issues
              </p>
              <Button
                variant="outline"
                className="w-full bg-transparent"
                size="lg"
              >
                <Phone className="mr-2 h-4 w-4" />
                +1 (555) 123-4567
              </Button>
              <div className="flex items-center justify-center text-sm text-muted-foreground">
                <Clock className="mr-1 h-3 w-3" />
                Mon-Fri 9AM-6PM EST
              </div>
            </CardContent>
          </Card> */}

          {/* Email Support */}
          {/* <Card>
            <CardHeader className="text-center">
              <div className="mx-auto h-12 w-12 bg-purple-500 rounded-full flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Email Support</CardTitle>
              <CardDescription>Send us detailed inquiries</CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                Email us for detailed questions or documentation requests
              </p>
              <Button
                variant="outline"
                className="w-full bg-transparent"
                size="lg"
              >
                <Mail className="mr-2 h-4 w-4" />
                support@company.com
              </Button>
              <div className="flex items-center justify-center text-sm text-muted-foreground">
                <Clock className="mr-1 h-3 w-3" />
                Response within 24 hours
              </div>
            </CardContent>
          </Card> */}
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  How quickly will I get a response?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  WhatsApp messages are typically answered within minutes during
                  business hours. Email responses are provided within 24 hours.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  What information should I include?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Please include your account details, a description of the
                  issue, and any relevant screenshots to help us assist you
                  faster.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Do you offer technical support?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes! Our technical support team can help with setup,
                  troubleshooting, and integration questions via any of our
                  contact methods.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Is support available on weekends?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  WhatsApp support is available Monday-Friday. Phone support is
                  Monday-Friday, but urgent issues can be handled via WhatsApp
                  anytime.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Need More Help?</CardTitle>
              <CardDescription>
                Our support team is ready to assist you with any questions or
                concerns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={handleWhatsAppClick}
                  className="bg-green-500 hover:bg-green-600"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  WhatsApp Us Now
                </Button>
                {/* <Button variant="outline">
                  <Mail className="mr-2 h-4 w-4" />
                  Send Email
                </Button> */}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

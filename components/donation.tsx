"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"

export default function Donation() {
  const handleDonation = () => {
    window.open("https://www.paypal.com/paypalme/calvinkellerman443", "_blank")
  }

  return (
    <Card className="bg-gradient-to-br from-amber-900/20 to-amber-800/10 border-amber-800/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-amber-500">
          <Heart className="w-5 h-5 text-red-500" />
          Support Our Work
        </CardTitle>
        <CardDescription>
          Help us maintain and improve ChronoVault by making a donation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-gray-300">
            Your support helps us continue our mission of preserving and sharing historical knowledge.
            All donations go towards maintaining our servers, improving our content, and developing new features.
          </p>
          <div className="flex flex-col items-center gap-4 p-6 bg-amber-950/20 rounded-lg border border-amber-900/20">
            <p className="text-amber-400 font-medium">Make a Donation via PayPal</p>
            <Button
              onClick={handleDonation}
              className="bg-[#0070ba] hover:bg-[#005ea6] text-white flex items-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.067 8.478c.492.315.844.825.983 1.46.545 2.463.922 4.963.922 7.522 0 .418-.012.83-.036 1.236-.094 1.62-1.506 2.808-3.134 2.808H7.823c-.636 0-1.176-.162-1.592-.49-.415-.327-.678-.787-.74-1.31v-.003L3.92 5.334H.978c-.503 0-.913-.41-.913-.913s.41-.913.913-.913h3.657c.446 0 .825.324.902.766l.345 2.112h15.435c1.29 0 2.346 1.056 2.346 2.346 0 .563-.197 1.108-.57 1.54l-2.028 1.206zm-1.574 1.258H7.826l1.048 7.873h9.177c.418 0 .793-.266.91-.677.06-.21.088-.436.088-.677 0-2.371-.35-4.683-.855-6.952-.063-.28-.31-.477-.597-.477h-1.03v2.346c0 .503-.41.913-.913.913s-.913-.41-.913-.913v-2.346h-3.656v2.346c0 .503-.41.913-.913.913s-.913-.41-.913-.913v-2.346H7.826l1.048 7.873" />
              </svg>
              Donate with PayPal
            </Button>
            <p className="text-sm text-gray-400">
              PayPal email: calvinkellerman443@gmail.com
            </p>
          </div>
          <div className="text-center text-sm text-gray-400">
            <p>Thank you for your support! ❤️</p>
            <p className="mt-1">Every contribution helps us grow and improve.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 
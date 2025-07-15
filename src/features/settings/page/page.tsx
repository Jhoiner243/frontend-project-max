/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSettings } from "@/features/settings/context/settings-context";
import {
  ClerkLoading,
  OrganizationProfile,
  OrganizationSwitcher,
  useOrganization,
} from "@clerk/clerk-react";
import { Laptop, Smartphone, Tablet } from "lucide-react";
import { toast } from "sonner";
import { Skeleton } from "../../../components/ui/skeleton";
import useNotificationsHook from "../../notifications/hook/use-notifications";
import { useGetEnabledNotificationsQuery } from "../../notifications/service";

export default function SettingsPage() {
  const { settings, updateNotificationSettings, updatePrivacySettings } =
    useSettings();
  const { handleEnableNotification } = useNotificationsHook();
  const { data: enabledNotifications } = useGetEnabledNotificationsQuery();
  console.log("enabledNotifications", enabledNotifications);
  const handleSaveNotifications = () => {
    updateNotificationSettings(settings.notifications);
    toast.success("Notification settings saved successfully");
    handleEnableNotification();
  };

  const handleSavePrivacy = () => {
    updatePrivacySettings(settings.privacy);
    toast.success("Privacy settings saved successfully");
  };

  const { organization } = useOrganization();
  return (
    <div className="container mx-auto py-10">
      <Tabs defaultValue="account" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="account">Cuenta de organización</TabsTrigger>
          <TabsTrigger value="security">Seguridad</TabsTrigger>
          <TabsTrigger value="preferences">Preferencias</TabsTrigger>
          <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
          <TabsTrigger value="privacy">Privacidad</TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <div className="flex justify-center items-center mt-5">
            <ClerkLoading>
              <Skeleton className="w-[850px] h-[850px]" />
            </ClerkLoading>
            {organization ? <OrganizationProfile /> : <OrganizationSwitcher />}
          </div>
        </TabsContent>

        <TabsContent value="security">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Manage your account's security settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="two-factor" />
                  <Label htmlFor="two-factor">
                    Enable Two-Factor Authentication
                  </Label>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Security Settings</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Login History</CardTitle>
                <CardDescription>
                  Recent login activities on your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    date: "2023-07-20",
                    time: "14:30 UTC",
                    ip: "192.168.1.1",
                    location: "New York, USA",
                  },
                  {
                    date: "2023-07-19",
                    time: "09:15 UTC",
                    ip: "10.0.0.1",
                    location: "London, UK",
                  },
                  {
                    date: "2023-07-18",
                    time: "22:45 UTC",
                    ip: "172.16.0.1",
                    location: "Tokyo, Japan",
                  },
                ].map((login, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center text-sm"
                  >
                    <span>
                      {login.date} {login.time}
                    </span>
                    <span>{login.ip}</span>
                    <span>{login.location}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Active Sessions</CardTitle>
                <CardDescription>
                  Currently active sessions on your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    device: "Laptop",
                    browser: "Chrome",
                    os: "Windows 10",
                    icon: Laptop,
                  },
                  {
                    device: "Smartphone",
                    browser: "Safari",
                    os: "iOS 15",
                    icon: Smartphone,
                  },
                  {
                    device: "Tablet",
                    browser: "Firefox",
                    os: "Android 12",
                    icon: Tablet,
                  },
                ].map((session, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="flex items-center">
                      <session.icon className="mr-2 h-4 w-4" />
                      {session.device}
                    </span>
                    <span>{session.browser}</span>
                    <span>{session.os}</span>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="outline">Log Out All Other Sessions</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>
                Customize your dashboard experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select Language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                      <SelectItem value="zh">中文</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select defaultValue="usd">
                    <SelectTrigger id="currency">
                      <SelectValue placeholder="Select Currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">USD ($)</SelectItem>
                      <SelectItem value="eur">EUR (€)</SelectItem>
                      <SelectItem value="gbp">GBP (£)</SelectItem>
                      <SelectItem value="jpy">JPY (¥)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date-format">Date Format</Label>
                  <Select defaultValue="mm-dd-yyyy">
                    <SelectTrigger id="date-format">
                      <SelectValue placeholder="Select Date Format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mm-dd-yyyy">MM-DD-YYYY</SelectItem>
                      <SelectItem value="dd-mm-yyyy">DD-MM-YYYY</SelectItem>
                      <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="font-size">Font Size</Label>
                  <Slider defaultValue={[16]} max={24} min={12} step={1} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Theme</Label>
                <RadioGroup defaultValue="system">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="light" id="theme-light" />
                    <Label htmlFor="theme-light">Light</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dark" id="theme-dark" />
                    <Label htmlFor="theme-dark">Dark</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="system" id="theme-system" />
                    <Label htmlFor="theme-system">System</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label>Dashboard Layout</Label>
                <RadioGroup defaultValue="default">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="default" id="layout-default" />
                    <Label htmlFor="layout-default">Default</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="compact" id="layout-compact" />
                    <Label htmlFor="layout-compact">Compact</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="expanded" id="layout-expanded" />
                    <Label htmlFor="layout-expanded">Expanded</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de notificaciones</CardTitle>
              <CardDescription>
                Administra cómo recibes notificaciones
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Canales de notificaciones</Label>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="push-notifications"
                      defaultChecked={enabledNotifications}
                      onChange={(e) =>
                        updateNotificationSettings({
                          ...settings.notifications,
                          push: (e.target as HTMLInputElement).checked,
                        })
                      }
                    />
                    <Label htmlFor="push-notifications">
                      Push Notifications
                    </Label>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Notification Types</Label>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="account-activity"
                      defaultChecked={settings.notifications.accountActivity}
                      onChange={(e) =>
                        updateNotificationSettings({
                          ...settings.notifications,
                          accountActivity: (e.target as HTMLInputElement)
                            .checked,
                        })
                      }
                    />
                    <Label htmlFor="account-activity">Account Activity</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="new-features"
                      defaultChecked={settings.notifications.newFeatures}
                      onChange={(e) =>
                        updateNotificationSettings({
                          ...settings.notifications,
                          newFeatures: (e.target as HTMLInputElement).checked,
                        })
                      }
                    />
                    <Label htmlFor="new-features">
                      New Features and Updates
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="marketing"
                      defaultChecked={settings.notifications.marketing}
                      onChange={(e) =>
                        updateNotificationSettings({
                          ...settings.notifications,
                          marketing: (e.target as HTMLInputElement).checked,
                        })
                      }
                    />
                    <Label htmlFor="marketing">Marketing and Promotions</Label>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notification-frequency">
                  Notification Frequency
                </Label>
                <Select
                  value={settings.notifications.frequency}
                  onValueChange={(value) =>
                    updateNotificationSettings({
                      ...settings.notifications,
                      frequency: value as
                        | "real-time"
                        | "daily"
                        | "weekly"
                        | undefined,
                    })
                  }
                >
                  <SelectTrigger id="notification-frequency">
                    <SelectValue placeholder="Select Frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="real-time">Real-time</SelectItem>
                    <SelectItem value="daily">Daily Digest</SelectItem>
                    <SelectItem value="weekly">Weekly Summary</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="quiet-hours-start">Quiet Hours</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="quiet-hours-start"
                    type="time"
                    defaultValue="22:00"
                  />
                  <span>to</span>
                  <Input
                    id="quiet-hours-end"
                    type="time"
                    defaultValue="07:00"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveNotifications}>
                Save Notification Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>
                Manage your privacy and data settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Data Sharing</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="analytics-sharing">
                        Share analytics data
                      </Label>
                      <Switch
                        id="analytics-sharing"
                        checked={settings.privacy.analyticsSharing}
                        onChange={(e: any) =>
                          updatePrivacySettings({
                            ...settings.privacy,
                            analyticsSharing: e.target.checked,
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="personalized-ads">
                        Allow personalized ads
                      </Label>
                      <Switch
                        id="personalized-ads"
                        checked={settings.privacy.personalizedAds}
                        onChange={(e: any) =>
                          updatePrivacySettings({
                            ...settings.privacy,
                            personalizedAds: e.target.checked,
                          })
                        }
                      />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Account Visibility
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup
                      value={settings.privacy.visibility}
                      onValueChange={(value: any) =>
                        updatePrivacySettings({
                          ...settings.privacy,
                          visibility: value,
                        })
                      }
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="public" id="visibility-public" />
                        <Label htmlFor="visibility-public">Public</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="private"
                          id="visibility-private"
                        />
                        <Label htmlFor="visibility-private">Private</Label>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Data Retention</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Select
                      value={settings.privacy.dataRetention}
                      onValueChange={(value) =>
                        updatePrivacySettings({
                          ...settings.privacy,
                          dataRetention: value as
                            | "6-months"
                            | "1-year"
                            | "2-years"
                            | "indefinite"
                            | undefined,
                        })
                      }
                    >
                      <SelectTrigger id="data-retention">
                        <SelectValue placeholder="Select Data Retention Period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6-months">6 Months</SelectItem>
                        <SelectItem value="1-year">1 Year</SelectItem>
                        <SelectItem value="2-years">2 Years</SelectItem>
                        <SelectItem value="indefinite">Indefinite</SelectItem>
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Third-Party Integrations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Connected: Google Analytics, Facebook Pixel
                    </p>
                    <Button variant="outline">Manage Integrations</Button>
                  </CardContent>
                </Card>
              </div>
              <div className="flex justify-between">
                <Button variant="outline">Download Your Data</Button>
                <Button variant="destructive">Delete My Account</Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSavePrivacy}>Save Privacy Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

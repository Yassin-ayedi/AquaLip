
import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { User, Bell, Sliders, Save, Camera } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

const Settings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    first_name: '',
    last_name: '',
    avatar_url: ''
  });

  const [settingsData, setSettingsData] = useState({
    ph_min: 6.0,
    ph_max: 7.5,
    temp_min: 20.0,
    temp_max: 26.0,
    oxygen_min: 7.0,
    oxygen_max: 9.0,
    salinity_min: 0.1,
    salinity_max: 0.5,
    water_level_min: 75,
    water_level_max: 95,
    light_intensity_min: 400,
    light_intensity_max: 600,
    email_notifications: true,
    push_notifications: true
  });

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      // Fetch profile data
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (profile) {
        setProfileData({
          first_name: profile.first_name || '',
          last_name: profile.last_name || '',
          avatar_url: profile.avatar_url || ''
        });
      }

      // Fetch settings data
      const { data: settings } = await supabase
        .from('user_settings')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (settings) {
        setSettingsData({
          ph_min: settings.ph_min || 6.0,
          ph_max: settings.ph_max || 7.5,
          temp_min: settings.temp_min || 20.0,
          temp_max: settings.temp_max || 26.0,
          oxygen_min: settings.oxygen_min || 7.0,
          oxygen_max: settings.oxygen_max || 9.0,
          salinity_min: settings.salinity_min || 0.1,
          salinity_max: settings.salinity_max || 0.5,
          water_level_min: settings.water_level_min || 75,
          water_level_max: settings.water_level_max || 95,
          light_intensity_min: settings.light_intensity_min || 400,
          light_intensity_max: settings.light_intensity_max || 600,
          email_notifications: settings.email_notifications ?? true,
          push_notifications: settings.push_notifications ?? true
        });
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: profileData.first_name,
          last_name: profileData.last_name,
          avatar_url: profileData.avatar_url,
          updated_at: new Date().toISOString()
        })
        .eq('id', user?.id);

      if (error) throw error;

      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSettingsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('user_settings')
        .update({
          ...settingsData,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user?.id);

      if (error) throw error;

      toast({
        title: "Settings Updated",
        description: "Your system thresholds have been successfully updated.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update settings.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>

        <div className="space-y-8">
          {/* Profile Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>Profile Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileSubmit} className="space-y-6">
                <div className="flex items-center space-x-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                    {profileData.avatar_url ? (
                      <img src={profileData.avatar_url} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <User className="w-12 h-12 text-white" />
                    )}
                  </div>
                  <div>
                    <Button type="button" variant="outline" size="sm">
                      <Camera className="w-4 h-4 mr-2" />
                      Change Photo
                    </Button>
                    <p className="text-sm text-gray-500 mt-1">JPG, GIF or PNG. 1MB max.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={profileData.first_name}
                      onChange={(e) => setProfileData({ ...profileData, first_name: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profileData.last_name}
                      onChange={(e) => setProfileData({ ...profileData, last_name: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                </div>

                <Button type="submit" disabled={loading}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Profile
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* System Thresholds */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sliders className="w-5 h-5" />
                <span>System Thresholds</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSettingsSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* pH Range */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">pH Level</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="ph_min">Min pH</Label>
                        <Input
                          id="ph_min"
                          type="number"
                          step="0.1"
                          min="0"
                          max="14"
                          value={settingsData.ph_min}
                          onChange={(e) => setSettingsData({ ...settingsData, ph_min: parseFloat(e.target.value) })}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="ph_max">Max pH</Label>
                        <Input
                          id="ph_max"
                          type="number"
                          step="0.1"
                          min="0"
                          max="14"
                          value={settingsData.ph_max}
                          onChange={(e) => setSettingsData({ ...settingsData, ph_max: parseFloat(e.target.value) })}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Temperature Range */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Temperature (°C)</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="temp_min">Min Temp</Label>
                        <Input
                          id="temp_min"
                          type="number"
                          step="0.1"
                          value={settingsData.temp_min}
                          onChange={(e) => setSettingsData({ ...settingsData, temp_min: parseFloat(e.target.value) })}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="temp_max">Max Temp</Label>
                        <Input
                          id="temp_max"
                          type="number"
                          step="0.1"
                          value={settingsData.temp_max}
                          onChange={(e) => setSettingsData({ ...settingsData, temp_max: parseFloat(e.target.value) })}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Dissolved Oxygen Range */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Dissolved Oxygen (mg/L)</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="oxygen_min">Min Oxygen</Label>
                        <Input
                          id="oxygen_min"
                          type="number"
                          step="0.1"
                          value={settingsData.oxygen_min}
                          onChange={(e) => setSettingsData({ ...settingsData, oxygen_min: parseFloat(e.target.value) })}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="oxygen_max">Max Oxygen</Label>
                        <Input
                          id="oxygen_max"
                          type="number"
                          step="0.1"
                          value={settingsData.oxygen_max}
                          onChange={(e) => setSettingsData({ ...settingsData, oxygen_max: parseFloat(e.target.value) })}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Salinity Range */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Salinity (ppt)</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="salinity_min">Min Salinity</Label>
                        <Input
                          id="salinity_min"
                          type="number"
                          step="0.1"
                          value={settingsData.salinity_min}
                          onChange={(e) => setSettingsData({ ...settingsData, salinity_min: parseFloat(e.target.value) })}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="salinity_max">Max Salinity</Label>
                        <Input
                          id="salinity_max"
                          type="number"
                          step="0.1"
                          value={settingsData.salinity_max}
                          onChange={(e) => setSettingsData({ ...settingsData, salinity_max: parseFloat(e.target.value) })}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Water Level Range */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Water Level (%)</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="water_level_min">Min Level</Label>
                        <Input
                          id="water_level_min"
                          type="number"
                          min="0"
                          max="100"
                          value={settingsData.water_level_min}
                          onChange={(e) => setSettingsData({ ...settingsData, water_level_min: parseInt(e.target.value) })}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="water_level_max">Max Level</Label>
                        <Input
                          id="water_level_max"
                          type="number"
                          min="0"
                          max="100"
                          value={settingsData.water_level_max}
                          onChange={(e) => setSettingsData({ ...settingsData, water_level_max: parseInt(e.target.value) })}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Light Intensity Range */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Light Intensity (μmol/m²/s)</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="light_intensity_min">Min Intensity</Label>
                        <Input
                          id="light_intensity_min"
                          type="number"
                          value={settingsData.light_intensity_min}
                          onChange={(e) => setSettingsData({ ...settingsData, light_intensity_min: parseInt(e.target.value) })}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="light_intensity_max">Max Intensity</Label>
                        <Input
                          id="light_intensity_max"
                          type="number"
                          value={settingsData.light_intensity_max}
                          onChange={(e) => setSettingsData({ ...settingsData, light_intensity_max: parseInt(e.target.value) })}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Notification Settings */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium flex items-center space-x-2">
                    <Bell className="w-5 h-5" />
                    <span>Notifications</span>
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email_notifications">Email Notifications</Label>
                        <p className="text-sm text-gray-500">Receive alerts via email</p>
                      </div>
                      <Switch
                        id="email_notifications"
                        checked={settingsData.email_notifications}
                        onCheckedChange={(checked) => setSettingsData({ ...settingsData, email_notifications: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="push_notifications">Push Notifications</Label>
                        <p className="text-sm text-gray-500">Receive push notifications</p>
                      </div>
                      <Switch
                        id="push_notifications"
                        checked={settingsData.push_notifications}
                        onCheckedChange={(checked) => setSettingsData({ ...settingsData, push_notifications: checked })}
                      />
                    </div>
                  </div>
                </div>

                <Button type="submit" disabled={loading}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Settings
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Settings;

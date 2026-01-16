
-- Create a profiles table to store user information
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create a user_settings table for thresholds and preferences
CREATE TABLE public.user_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  ph_min DECIMAL(3,1) DEFAULT 6.0,
  ph_max DECIMAL(3,1) DEFAULT 7.5,
  temp_min DECIMAL(4,1) DEFAULT 20.0,
  temp_max DECIMAL(4,1) DEFAULT 26.0,
  oxygen_min DECIMAL(4,1) DEFAULT 7.0,
  oxygen_max DECIMAL(4,1) DEFAULT 9.0,
  salinity_min DECIMAL(3,1) DEFAULT 0.1,
  salinity_max DECIMAL(3,1) DEFAULT 0.5,
  water_level_min INTEGER DEFAULT 75,
  water_level_max INTEGER DEFAULT 95,
  light_intensity_min INTEGER DEFAULT 400,
  light_intensity_max INTEGER DEFAULT 600,
  email_notifications BOOLEAN DEFAULT true,
  push_notifications BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" 
  ON public.profiles 
  FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
  ON public.profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Create RLS policies for user_settings
CREATE POLICY "Users can view their own settings" 
  ON public.user_settings 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own settings" 
  ON public.user_settings 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own settings" 
  ON public.user_settings 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create a function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data ->> 'first_name',
    NEW.raw_user_meta_data ->> 'last_name'
  );
  
  INSERT INTO public.user_settings (user_id)
  VALUES (NEW.id);
  
  RETURN NEW;
END;
$$;

-- Create trigger to automatically create profile and settings on user signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

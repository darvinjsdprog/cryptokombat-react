import { Stack } from "expo-router";
import Head from "expo-router/head";
import React from "react";

type SEOProps = {
  title: String;
  description: String;
};

export function SEO({ title, description }: SEOProps) {
  const appName = process.env.EXPO_PUBLIC_APP_NAME;
  return (
    <Head>
      <title>
        {appName} - {title}
      </title>
      <meta name="description" content={description + " - " + appName} />
    </Head>
    // <Stack.Screen options={{ title: `${appName} - ${title}` }} />
  );
}

// src/utils/api.js

export async function getAccessToken() {
  const clientId = 'x40562dcg51f5vvltqa497a2jexmps';
  const clientSecret = 'cgkpgnjoesft6jjegi7jgj7mdvuob0';

  const response = await fetch(`https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`, {
    method: 'POST'
  });

  const data = await response.json();
  return data.access_token;
}

export async function fetchLiveChannels(accessToken) {
  const response = await fetch('https://api.twitch.tv/helix/streams?first=10', {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Client-Id': 'x40562dcg51f5vvltqa497a2jexmps'
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch live channels');
  }

  const data = await response.json();

  // Obtenir les informations utilisateur pour chaque streamer
  const liveChannelsWithUserInfo = await Promise.all(data.data.map(async channel => {
    const userInfo = await fetchUserInformation(channel.user_id, accessToken);
    return {
      ...channel,
      profile_image_url: userInfo.profile_image_url // Ajouter l'URL de l'image de profil
    };
  }));

  return liveChannelsWithUserInfo;
}

export async function fetchUserInformation(userId, accessToken) {
  const response = await fetch(`https://api.twitch.tv/helix/users?id=${userId}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Client-Id': 'x40562dcg51f5vvltqa497a2jexmps'
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch user information for user ID ${userId}: ${response.status} - ${response.statusText}`);
  }

  const data = await response.json();
  return data.data[0]; // Renvoie le premier utilisateur trouvé (normalement, un seul résultat)
}

export async function fetchTopCategories() {
  const accessToken = await getAccessToken();

  const response = await fetch('https://api.twitch.tv/helix/games/top?first=5', {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Client-Id': 'x40562dcg51f5vvltqa497a2jexmps'
    }
  });

  const data = await response.json();
  return data.data;
}

const fetchUserProfileFromTwitch = async (accessToken) => {
  try {
    const response = await fetch('https://api.twitch.tv/helix/users', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Client-Id': 'x40562dcg51f5vvltqa497a2jexmps', // Assurez-vous que c'est votre Client ID Twitch
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user profile');
    }

    const data = await response.json();
    return data.data[0]; // Assurez-vous que l'objet `data` contient les données attendues
  } catch (error) {
    console.error('Error fetching Twitch user profile: ', error);
    throw error;
  }
};


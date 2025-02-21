import { NextResponse } from 'next/server';

async function fetchRepoStats(repoName: string) {
  try {
    const response = await fetch(`https://api.github.com/repos/rakibul263/${repoName}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      }
    });
    const data = await response.json();
    return {
      stars: data.stargazers_count || 0,
      forks: data.forks_count || 0,
      watchers: data.watchers_count || 0,
      views: data.watchers_count || 0, // Using watchers as a proxy since view count requires authentication
    };
  } catch (error) {
    console.error(`Error fetching stats for ${repoName}:`, error);
    return { stars: 0, forks: 0, watchers: 0, views: 0 };
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const repo = searchParams.get('repo');

  if (!repo) {
    return NextResponse.json({ error: 'Repository name is required' }, { status: 400 });
  }

  const stats = await fetchRepoStats(repo);
  return NextResponse.json(stats);
} 
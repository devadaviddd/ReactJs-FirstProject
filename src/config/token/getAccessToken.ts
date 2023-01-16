export const getAccessToken = (): string | null =>  {
  return localStorage.getItem('token');
}
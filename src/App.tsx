import { useEffect, useMemo } from 'react';
import './App.css'
import useNavigation from './hooks/useNavigation'
import CharactersPage from './pages/CharactersPage'
import LocationsPage from './pages/LocationsPage';
import EpisodePage from './pages/EpisodePage';
import Header from './components/Header';
export type PagePropsType = {body?: any, path?: string, props?: string}
type PageType = (({body, path}: PagePropsType) => React.ReactNode);

function App() {
  const {navigation, navigate} = useNavigation();

  const Pages: {[key: string]: PageType} = {
    "/": CharactersPage,
    "/locations": LocationsPage,
    "/episodes": EpisodePage,
  }

  const Page = useMemo(() => Pages[navigation.currentUrl] ?? (() => <>404</>), [navigation.currentUrl]);

  useEffect(() => {
    window.addEventListener("popstate", () => {
      navigate(window.location.pathname + "?" + window.location.search)
    })
  }, [])

  return <>
    <Header/>
    <Page body={navigation.body} path={navigation.currentUrl} props={navigation.props}/>
  </>
}

export default App

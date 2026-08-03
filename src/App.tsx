import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { PageMeta } from './components/PageMeta'
import { company } from './config/company'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ProjectPage } from './pages/ProjectPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            index
            element={(
              <>
                <PageMeta
                  title="GAMAK | Obras, instalações e manutenções"
                  description={company.description}
                  image={`${company.website}/images/brand/gamak-logo-oficial.png`}
                />
                <HomePage />
              </>
            )}
          />
          <Route path="projetos/:slug" element={<ProjectPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

import { lazy, Suspense} from 'react';
import * as ROUTES from './constants/routes'
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom'

const Main = lazy(()=> import ('./pages/main'))

function App() {
  return (
    <div className="App">
     <Router>
        <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path={ROUTES.MAIN} element={<Main/>}/>
        </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;

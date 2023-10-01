import { BrowserRouter } from 'react-router-dom';
import AuthWrapper from './components/auth/AuthWrapper';

function App() {
	return (
		<div className='web-builder-application' style={{position: "relative"}}>
			<BrowserRouter>
				<AuthWrapper />
			</BrowserRouter>
		</div>
	);
}

export default App;

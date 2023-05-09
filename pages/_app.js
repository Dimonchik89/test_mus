import { Provider } from 'react-redux'
import '../styles/globals.scss'
import store from '../store/store'

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

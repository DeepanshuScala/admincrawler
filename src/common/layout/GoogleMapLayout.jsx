import { LoadScriptNext } from '@react-google-maps/api';

export default function GoogleMapLayout({ children }) {
    return (
        <LoadScriptNext googleMapsApiKey={'AIzaSyDUvDUk0y7o4O_XPRHxnHcgONZgkszf5Hs'} libraries={['places']}>
            {children}
        </LoadScriptNext>
    )
}

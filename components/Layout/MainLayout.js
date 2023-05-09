import Head from "next/head";

const MainLayout = ({children}) => {

    return (
        <>
            <div className="_container">
                {children}
            </div>
        </>
    )
}
export default MainLayout;
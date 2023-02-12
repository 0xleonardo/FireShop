import pageNotFoundImage from '../../../assets/404.png'

export const PageNotFound = () => {

    return (
        <div className="page_not_found">
            <img src={pageNotFoundImage} alt="404 NOT FOUND"/>
        </div>
    )
}
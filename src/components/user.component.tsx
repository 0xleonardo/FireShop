import {useStore} from "../stores/utils/store-provider";
import {observer} from "mobx-react";

export const UserComponent = observer(() => {

    const {userStore} = useStore();

    console.log(userStore.getUser?.email)

    return (
        <div>
            {userStore.getUser?.name}
        </div>
    )

})
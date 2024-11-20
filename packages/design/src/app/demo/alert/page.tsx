'use client';

import {Button, useAlert} from "@easykit/design";

const Page = () => {
    const alert = useAlert();

    const test = () => {
        alert.confirm({
            title: "删除？",
            description: "是否要删除这条记录，所有的子权限以及关联的角色权限将会失效，是否继续？",
            cancelText: "取消",
            okText: "删除",
            onOk: async () => {
                console.log("ok")
                return false;
            }
        })
    }

    return <div className={"p-4"}>
        <Button onClick={test}>确认</Button>
    </div>
}

export default Page;

import { Button, Input } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons"

const ChooseQuantity = ({ count, setCount }) => {
    
    return (
        <>
            <Button
                disabled={count === 1}
                onClick={() => setCount(count - 1)}
            >
                <MinusOutlined />
            </Button>
            <Input
                defaultValue={count}
                style={{ maxWidth: '5.3rem', textAlign: 'center' }}
                value={`${count}`}
                readOnly
            />
            <Button onClick={() => setCount(count + 1)}>
                <PlusOutlined />
            </Button>
        </>
    )
}

export default ChooseQuantity;
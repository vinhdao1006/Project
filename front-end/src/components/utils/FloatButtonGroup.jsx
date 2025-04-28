import React from 'react';
import { QuestionCircleOutlined, SyncOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';

const App = () => (
  <>
    <FloatButton.Group
      shape="circle"
      className='hidden md:flex'
      style={{
        insetInlineEnd: 24,
      }}
    >
      <FloatButton icon={<QuestionCircleOutlined />} />
      <FloatButton />
      <FloatButton.BackTop visibilityHeight={0} />
    </FloatButton.Group>
    <FloatButton.Group
      shape="square"
      className='hidden md:flex'
      style={{
        insetInlineEnd: 94,
      }}
    >
      <FloatButton icon={<QuestionCircleOutlined />} />
      <FloatButton />
      <FloatButton icon={<SyncOutlined />} />
      <FloatButton.BackTop visibilityHeight={0} />
    </FloatButton.Group>

    {/* BackTop Button for Mobile and Tablet */}
    <FloatButton.BackTop
      visibilityHeight={0}
      className="md:hidden" // Visible only on mobile and tablet
    />
  </>
);
export default App;
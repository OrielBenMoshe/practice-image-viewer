import { Button, Image } from 'antd';
import React, { useState, useEffect, useRef } from 'react';
import Draggable from 'react-draggable';

import { CloseOutlined, ZoomOutOutlined, ZoomInOutlined } from '@ant-design/icons'

export default function ImageButton({ imageUrl }) {
    const [visible, setVisible] = useState(false);
    const [imageState, setImageState] = useState('initial');
    const [positionOffset, setPositionOffset] = useState({ x: '0%', y: '0%' });
    const nodeRef = React.useRef(null);
    const zoomInRef = useRef(null)
    const zoomOutRef = useRef(null)

    useEffect(() => {
        console.log("visible:", visible);
    }, [visible]);

    const hundleClose = (e) => {
        setImageState('initial');
        setVisible(false);
        setPositionOffset(positionOffset);
    }

    const setZoomIn = (e) => {
        // console.log(e.target.style.color =);
        imageState !== 'zoom-in-in' && setImageState((imageState) => {
            if (imageState === 'initial') return 'zoom-in'
            else if (imageState === 'zoom-in') return 'zoom-in-in';
        })
    };
    const setZoomOut = (e) => {
        imageState !== 'initial' && setImageState((imageState) => {
            if (imageState === 'zoom-in') return 'initial';
            else if (imageState === 'zoom-in-in') return 'zoom-in';

        })
    }

    useEffect(() => {

        imageState === 'initial' && (zoomOutRef.current.style.color = '#525252') && (zoomInRef.current.style.color = 'white')
        imageState === 'zoom-in' && (zoomOutRef.current.style.color = 'white') && (zoomInRef.current.style.color = 'white')
        imageState === 'zoom-in-in' && (zoomOutRef.current.style.color = 'white') && (zoomInRef.current.style.color = '#525252')

    }, [imageState])


    return (
        <div className='ImageButton'>
            <Button type="default" size='large' onClick={() => setVisible(true)}>
                הצג תצוגה מקדימה של תמונה
            </Button>
            <div className={visible ? 'modal-wrapper visible' : 'modal-wrapper'} >
                <div className="controle-bar">
                    <ZoomInOutlined ref={zoomInRef} size="large" onClick={setZoomIn} />
                    <ZoomOutOutlined ref={zoomOutRef} style={{ color: '#525252' }} onClick={setZoomOut} />
                    <CloseOutlined className='close-icon' onClick={hundleClose} />
                </div>
                <Draggable
                    positionOffset={positionOffset}
                    scale={1}
                    nodeRef={nodeRef}
                >
                    <div className='image-wrapper' ref={nodeRef}>
                        <img className={imageState} src={imageUrl} alt="" draggable="false" />
                    </div>
                </Draggable>
            </div>
        </div>
    )
}

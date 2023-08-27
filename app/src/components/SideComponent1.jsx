import React, { useEffect } from 'react';
import styles from './sideComponent1Style.css';
import { CrossSVG } from '@ensdomains/thorin';
import { FieldSet, Input, Textarea, Button } from '@ensdomains/thorin';

const SideComponent1 = ({ isVisible, onClose, children, currentLevel, isToggleOn, accountAddress }) => {

    if (!isVisible) return null;

    console.log(accountAddress);

    return (
        <div className='sideComponent1'>
            {currentLevel === 'subsubarea' && isToggleOn === true ?
                <div className='addForm'>
                    <FieldSet legend="Add Place">
                        <Input
                            label="Place Name"
                            placeholder="Please enter a place name"
                        />
                        <Textarea
                            label="Description"
                            placeholder="Please enter a brief description of the place"
                        />
                    </FieldSet>
                    <br />
                    <Button>Connect Wallet</Button>
                </div>
                : null}
            {children}
            <button className='closeButton' onClick={onClose}><CrossSVG /></button>
            {/* SideComponent1 */}
        </div >
    );
}

export default SideComponent1;
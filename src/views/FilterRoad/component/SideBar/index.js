import React from 'react';
import Button from '@material-ui/core/Button';

export default function Sidebar(){
    return (
        <div>
            <Button variant="outlined">
                A-Z
            </Button>
            <Button variant="outlined">
                Z-A
            </Button>
            <Button variant="outlined">
                Sort
            </Button>
        </div>
    );
}
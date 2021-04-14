export const onDragStart = (e) => {
    const elementID = e.target.dataset.id;
    e.dataTransfer.setData('text',elementID)
};

export const onDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
};

export const onDragLeave = (e) => {
    e.target.style.backgroundColor = '';
};

export const onDragEnter = (e) => {
    e.target.style.backgroundColor = 'red';
};

export const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.target.style.backgroundColor = '';
    const elementID = e.dataTransfer.getData('text');
    const element = document.querySelector(`img[data-id = "${elementID}"]`);
    const typeSource = element.dataset.type;
    const typeDestination = e.target.dataset.type;
    if (typeSource === typeDestination){
        e.target.appendChild(element);
    }
    
    console.log(elementID)
};

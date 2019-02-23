const toForm = async (obj) => {
    if(!obj.keys) return 
    const formData = new FormData();
    for (var key in obj ) {
      await formData.append(key, obj[key]);
    }
    return formData
}

export default toForm
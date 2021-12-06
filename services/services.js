 
  const createUser = (userName) => {
    console.log('saving..');
    console.log(`user "${userName}" created`);
  };

  const deleteUser = (userName) => {
    console.log('saving..');
    console.log(`user "${userName}" deleted`);
  };
const fetchImageMetadata = (id) => {
    return {
        
      id: id,
      title: 'Sunset',
      description: 'Taken in Mexico - may be useful in an advertisement',
      creator: 'Steven A. Brown',
      date: new Date()
    };
  };
 
  
  exports.fetchImageMetadata = fetchImageMetadata;
  exports.createUser = createUser;
  exports.deleteUser = deleteUser;
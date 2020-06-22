import neo4j from 'neo4j-driver';

function generateDriver() {
  console.log('generating driver');
  return neo4j.driver('bolt://graph-db:7687', neo4j.auth.basic('neo4j', 'root'))
}

export default generateDriver();

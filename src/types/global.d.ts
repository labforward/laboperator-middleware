interface Attributes {
  [key: string]: string | number | boolean | Attributes;
}

interface Relationship {
  id: string;
  type: string;
}

interface Resource {
  attributes: Attributes;
  id: string;
  relationships: {
    [key: string]: {
      data: Array<Relationship> | Relationship;
    };
  };
  type: string;
}
interface ResourceData {
  data?: Resource;
}

type Resources = Array<ResourceData | Resource>;
interface ResourcesData {
  data?: Resources;
}

declare namespace NodeJS {
  interface Global {
    chai: Chai.ChaiStatic;
    expect: Chai.ExpectStatic;
    request: Chai.ChaiHttpRequest;
  }
}

declare const expect: Chai.ExpectStatic;
declare const request: Chai.ChaiHttpRequest;

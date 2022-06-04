import configRepository from "../repositories/configRepository";

const configService = {
  createBaseData: (): Promise<string> => {
    return configRepository.createBaseData();
  },

  flushDatabase: (): Promise<string> => {
    return configRepository.flushDatabase();
  },
};

export default configService;

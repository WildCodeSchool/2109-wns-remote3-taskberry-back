import configRepository from "../repositories/configRepository";

const configService = {
    createBaseData: (): Promise<string> => {
    return configRepository.createBaseData();
  },
};

export default configService;

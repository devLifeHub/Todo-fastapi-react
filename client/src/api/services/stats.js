import api from "../index";

const statsApi = {
  async fetchStats() {
    const [u, t] = await Promise.all([
      api.get("/users-count"),
      api.get("/todos-count"),
    ]);
    return {
      usersCount: u.data,
      todosCount: t.data,
    };
  },
};

export default statsApi;
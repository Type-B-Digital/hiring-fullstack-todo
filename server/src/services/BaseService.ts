export class BaseService<T> {
  constructor(protected model: any) {}

  async findAll(): Promise<T[]> {
    return this.model.find().sort({ createdAt: -1 });
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findById(id);
  }

  async create(data: Partial<T>): Promise<T> {
    return this.model.create(data);
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    const updated = await this.model.findByIdAndUpdate(id, data, { new: true });
    if (!updated) {
      const error: any = new Error("Todo item not found with the provided ID");
      error.statusCode = 404;
      throw error;
    }
    return updated;
  }

  async delete(id: string): Promise<T | null> {
    return this.model.findByIdAndDelete(id);
  }
}
